<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifyMail extends Mailable
{
    use Queueable, SerializesModels;

    public $email;
    public $token;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($email,$token)
    {
        $this->email=$email;
        $this->token=$token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('auth.verify_email')->with([
            'token'=>$this->token,
            'email'=>$this->email
        ]);
    }
}
