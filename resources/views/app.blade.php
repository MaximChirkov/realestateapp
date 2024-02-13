<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Real estate app</title>

    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700,800' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="{{asset('template')}}/assets/css/normalize.css">
    <link rel="stylesheet" href="{{asset('template')}}/assets/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{asset('template')}}/assets/css/fontello.css">
    <link href="{{asset('template')}}/assets/fonts/icon-7-stroke/css/pe-icon-7-stroke.css" rel="stylesheet">
    <link href="{{asset('template')}}/assets/fonts/icon-7-stroke/css/helper.css" rel="stylesheet">
    <link href="{{asset('template')}}/assets/css/animate.css" rel="stylesheet" media="screen">
    <link rel="stylesheet" href="{{asset('template')}}/assets/css/bootstrap-select.min.css">
    <link rel="stylesheet" href="{{asset('template')}}/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{asset('template')}}/assets/css/icheck.min_all.css">
    <link rel="stylesheet" href="{{asset('template')}}/assets/css/price-range.css">
    <link rel="stylesheet" href="{{asset('template')}}/assets/css/owl.carousel.css">
    <link rel="stylesheet" href="{{asset('template')}}/assets/css/owl.theme.css">
    <link rel="stylesheet" href="{{asset('template')}}/assets/css/owl.transitions.css">
    <link rel="stylesheet" href="{{asset('template')}}/assets/css/wizard.css"/>
    <link rel="stylesheet" href="{{asset('template')}}/assets/css/lightslider.min.css"/>
    <link rel="stylesheet" href="{{asset('template')}}/assets/css/style.css">
    <link rel="stylesheet" href="{{asset('template')}}/assets/css/responsive.css">

    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
    <script>
        window._base_url = '{{url('/')}}';
        window._asset = '{{asset('')}}';
    </script>

    @if(auth()->check())
        @php
            $authUser = [
                'signedIn' => true,
                'user' =>  auth()->user()
            ];
        @endphp
    @else
        @php
            $authUser = [
                'signedIn' => false,
                'user' => null
            ];
        @endphp
    @endif

    <script>
        window._authUser = JSON.parse(atob('{{ base64_encode(json_encode($authUser)) }}'));
    </script>
</head>
<body>
<div id="app">
</div>

<script src="{{asset('template')}}/assets/js/modernizr-2.6.2.min.js"></script>

<script src="{{asset('template')}}/assets/js/jquery-1.10.2.min.js"></script>
<script src="{{asset('template')}}/assets/js/bootstrap.min.js" type="text/javascript"></script>
<script src="{{asset('template')}}/assets/js/bootstrap-select.min.js"></script>
<script src="{{asset('template')}}/assets/js/bootstrap-hover-dropdown.js"></script>

<script src="{{asset('template')}}/assets/js/easypiechart.min.js"></script>
<script src="{{asset('template')}}/assets/js/jquery.easypiechart.min.js"></script>

<script src="{{asset('template')}}/assets/js/owl.carousel.min.js"></script>
<script src="{{asset('template')}}/assets/js/wow.js"></script>

<script src="{{asset('template')}}/assets/js/icheck.min.js"></script>
<script src="{{asset('template')}}/assets/js/price-range.js"></script>
<script type="text/javascript" src="{{asset('template')}}/assets/js/lightslider.min.js"></script>
<script src="{{asset('template')}}/assets/js/app.js"></script>

</body>
</html>
