<?php

declare(strict_types=1);

use App\ApplicationParams;
use Crenspire\Inertia\View\InertiaView;
use Crenspire\Inertia\Vite\Vite;
use Yiisoft\Html\Html;

/**
 * @var ApplicationParams $applicationParams
 * @var InertiaView $inertia
 * @var Vite $vite
 */
?>
<!DOCTYPE html>
<html lang="<?= Html::encode($applicationParams->locale) ?>">
<head>
    <meta charset="<?= Html::encode($applicationParams->charset) ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title data-inertia><?= Html::encode($inertia->page->component . ' - Yii3 React Starter Kit') ?></title>
    <!-- Apply dark mode before React renders to avoid a flash of the light theme -->
    <script>
      (function () {
        let theme = 'system';
        try {
          theme = localStorage.getItem('theme') || 'system';
        } catch (e) {}
        const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList.toggle('dark', dark);
      })();
    </script>
    <?= $vite->reactRefresh() ?>
    <?= $vite->tags('assets/react/src/main.jsx') ?>
    <?= $inertia->head() ?>
</head>
<body>
<?= $inertia->body() ?>
</body>
</html>
