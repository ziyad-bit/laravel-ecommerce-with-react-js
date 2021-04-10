@component('mail::message')
# Reset Password

Reset or change your password.

@component('mail::button', ['url' => 'http://localhost:8000/change-password/'.$email.'?token='.$token])
Change Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent