<?php

declare(strict_types=1);

use App\ApplicationParams;
use App\Environment;
use Yiisoft\Aliases\Aliases;
use Yiisoft\Html\Html;

/**
 * @var ApplicationParams $applicationParams
 * @var Aliases $aliases
 * @var string $page
 * @var array $payload
 */

$isDev = Environment::isDev();
$baseUrl = rtrim($aliases->get('@baseUrl'), '/');

// Resolve /public
$publicPath = $aliases->get('@public');
while (str_starts_with($publicPath, '@')) {
    $publicPath = $aliases->get($publicPath);
}

// For production - look for manifest.json in public/dist/
$manifestFile = $publicPath . '/dist/manifest.json';
$jsFile = null;
$cssFile = null;

if (file_exists($manifestFile)) {
    $manifest = json_decode(file_get_contents($manifestFile), true);
    
    if ($manifest !== null) {
        // Look for the entry point: assets/react/src/main.jsx
        $entryKey = 'assets/react/src/main.jsx';
        if (isset($manifest[$entryKey])) {
            $entry = $manifest[$entryKey];
        } else {
            // Fallback to first entry if key doesn't match
            $entryKey = array_key_first($manifest);
            $entry = $manifest[$entryKey] ?? null;
        }
        
        if ($entry && isset($entry['file'])) {
            $jsFile = '/dist/' . ltrim($entry['file'], '/');
            
            if (!empty($entry['css']) && is_array($entry['css'])) {
                $cssFile = '/dist/' . ltrim($entry['css'][0], '/');
            }
        }
    }
}

// Check Vite dev server
$useViteDev = false;
if ($isDev) {
    $socket = @fsockopen('localhost', 5173, $errno, $errstr, 0.15);
    if ($socket) {
        $useViteDev = true;
        fclose($socket);
    }
}
?>
<!DOCTYPE html>
<html lang="<?= Html::encode($applicationParams->locale) ?>" class="">
<head>
    <meta charset="<?= Html::encode($applicationParams->charset) ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= Html::encode(($payload['component'] ?? 'App') . ' - Yii3 React Starter Kit') ?></title>

    <?php if ($useViteDev): ?>
        <!-- Initialize dark mode from localStorage before React loads -->
        <script>
          (function() {
            const stored = localStorage.getItem('darkMode');
            const isDark = stored !== null 
              ? stored === 'true' 
              : window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (isDark) {
              document.documentElement.classList.add('dark');
            }
          })();
        </script>
        <!-- React Refresh preamble - MUST be before @vite/client -->
        <script type="module">
          import RefreshRuntime from 'http://localhost:5173/@react-refresh';
          RefreshRuntime.injectIntoGlobalHook(window);
          window.$RefreshReg$ = () => {};
          window.$RefreshSig$ = () => (type) => type;
          window.__vite_plugin_react_preamble_installed__ = true;
        </script>
        <!-- Vite dev server -->
        <script type="module" src="http://localhost:5173/@vite/client"></script>
        <script type="module" src="http://localhost:5173/assets/react/src/main.jsx"></script>

    <?php elseif ($jsFile): ?>

    <?php if ($cssFile): ?>
    <link rel="stylesheet" href="<?= Html::encode($baseUrl . $cssFile) ?>" crossorigin="anonymous">
    <?php endif; ?>

        <script type="module" src="<?= Html::encode($baseUrl . $jsFile) ?>" crossorigin="anonymous"></script>

    <?php else: ?>
        <script>console.error("No Vite build found. Run 'npm run build'");</script>
    <?php endif; ?>
    
    <!-- Initialize dark mode from localStorage for production build -->
    <?php if (!$useViteDev): ?>
    <script>
      (function() {
        const stored = localStorage.getItem('darkMode');
        const isDark = stored !== null 
          ? stored === 'true' 
          : window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDark) {
          document.documentElement.classList.add('dark');
        }
      })();
    </script>
    <?php endif; ?>
</head>

<body>
<div id="app" data-page="<?= $page ?>"></div>
</body>
</html>
