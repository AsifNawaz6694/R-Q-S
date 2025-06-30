<?php

return [
    'pages' => [
        'directory' => app_path('Http/Controllers'),
        'namespace' => 'App\Http\Controllers',
    ],
    'middleware' => [
        'web',
    ],
    'version' => env('APP_VERSION', md5_file(public_path('mix-manifest.json'))),
    'asset_version_query_parameter' => 'v',
    'assets' => [
        'path' => public_path('mix-manifest.json'),
        'url' => env('MIX_ASSET_URL', env('APP_URL', '')),
    ],
    'response' => [
        'root_view' => 'app',
        'pretty' => env('APP_DEBUG', false),
    ],
];
