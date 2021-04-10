@component('mail::message')
# verify your email

@component('mail::button', ['url' => 'http://localhost:8000/verify/'.$email.'?token='.$token])
verify
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent