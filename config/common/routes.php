<?php

declare(strict_types=1);

use App\Auth\RedirectIfAuthenticatedMiddleware;
use App\Auth\RequireAuthMiddleware;
use App\Controller;
use Yiisoft\Router\Group;
use Yiisoft\Router\Route;

return [
    Group::create()
        ->routes(
            Route::get('/')
                ->action(Controller\HomePage\Action::class)
                ->name('home'),
        ),

    Group::create()
        ->middleware(RedirectIfAuthenticatedMiddleware::class)
        ->routes(
            Route::get('/login')
                ->action(Controller\Auth\ShowLoginAction::class)
                ->name('login'),
            Route::post('/login')
                ->action(Controller\Auth\LoginAction::class)
                ->name('login/submit'),
        ),

    Route::post('/logout')
        ->action(Controller\Auth\LogoutAction::class)
        ->name('logout'),

    Group::create('/admin')
        ->middleware(RequireAuthMiddleware::class)
        ->routes(
            Route::get('')
                ->action(Controller\Admin\DashboardAction::class)
                ->name('admin/dashboard'),
            Route::get('/users')
                ->action(Controller\Admin\Users\IndexAction::class)
                ->name('admin/users'),
            Route::post('/users')
                ->action(Controller\Admin\Users\StoreAction::class)
                ->name('admin/users/store'),
            Route::put('/users/{id:\d+}')
                ->action(Controller\Admin\Users\UpdateAction::class)
                ->name('admin/users/update'),
            Route::delete('/users')
                ->action(Controller\Admin\Users\DeleteAction::class)
                ->name('admin/users/delete'),
            Route::get('/settings')
                ->action(Controller\Admin\Settings\ShowAction::class)
                ->name('admin/settings'),
            Route::put('/settings')
                ->action(Controller\Admin\Settings\UpdateAction::class)
                ->name('admin/settings/update'),
        ),
];
