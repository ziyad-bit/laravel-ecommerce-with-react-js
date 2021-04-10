<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <title>Document</title>
</head>

<body>
    <div class="container">
    <h2 class="text-center">reset password</h2>
    <form method="POST" action="api/">
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" name="email" class="form-control" value="{{request('email')}}" >
        </div>

        <div class="form-group">
            <label for="exampleInputPassword1">enter new Password</label>
            <input type="password" name="password" class="form-control" id="exampleInputPassword1">
        </div>

        <div class="form-group">
            <label for="exampleInputPassword1">confirm Password</label>
            <input type="password" name="password_confirmation" class="form-control" id="exampleInputPassword1">
        </div>

        <input type="hidden" name="token" value="{{request('token')}}">
        

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
</body>

</html>
