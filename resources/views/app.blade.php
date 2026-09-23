<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

    <meta
        name="csrf-token"
        content="{{ csrf_token() }}"
    >

    <!-- Favicon -->
    <link
        rel="icon"
        type="image/png"
        href="{{ asset('images/logo.png') }}"
    >

    <!-- Apple Touch Icon -->
    <link
        rel="apple-touch-icon"
        href="{{ asset('images/logo.png') }}"
    >

    <!-- Default Title -->
    <title inertia>
        {{ config('app.name', 'Portal Akademik') }}
    </title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    @inertiaHead
</head>

<body class="antialiased">
    @inertia
</body>

</html>