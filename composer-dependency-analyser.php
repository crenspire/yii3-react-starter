<?php

declare(strict_types=1);

use ShipMonk\ComposerDependencyAnalyser\Config\Configuration;
use ShipMonk\ComposerDependencyAnalyser\Config\ErrorType;

$root = __DIR__;
return (new Configuration())
    ->disableComposerAutoloadPathScan()
    ->setFileExtensions(['php'])
    ->addPathToScan($root . '/src', isDev: false)
    ->addPathToScan($root . '/config', isDev: false)
    ->addPathToScan($root . '/public/index.php', isDev: false)
    ->addPathToScan($root . '/yii', isDev: false)
    ->addPathToScan($root . '/tests', isDev: true)
    // Used through configuration only: the Inertia adapter resolves @public and @baseUrl with it.
    ->ignoreErrorsOnPackage('yiisoft/aliases', [ErrorType::UNUSED_DEPENDENCY])
    ->ignoreErrorsOnPackage('yiisoft/config', [ErrorType::UNUSED_DEPENDENCY])
    ->ignoreErrorsOnPackage('yiisoft/di', [ErrorType::UNUSED_DEPENDENCY])
    ->ignoreErrorsOnPackage('yiisoft/router-fastroute', [ErrorType::UNUSED_DEPENDENCY]);
