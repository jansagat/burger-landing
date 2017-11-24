<?php

namespace Burger\MailController;

use PHPMailer\PHPMailer\PHPMailer;

class MailController
{
    public $message = [];
    private $post;
    private $email;
    public $callOrNot = 'звонить';

    function __construct()
    {
        if ($_POST) {
            $this->post = $_POST;
        } else {
            header("HTTP/1.1 404 Not Found");
            exit();
        }

        if (isset($_POST['notCall'])) {
            $this->callOrNot = 'Не звонить';
        }
    }

    public function validator()
    {
        foreach ($this->post as $key => $item) {
            if (!$item) {
                $this->message[$key] = 'empty';
            }
        }
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function sendEmail()
    {
        $this->validator();

        if ($this->message) {
            http_response_code(400);
            return json_encode($this->message);
        };

        $mail = new PHPMailer(true);
        try {
            //Server settings
            $mail->SMTPDebug = 0;
            $mail->CharSet = 'UTF-8';
            $mail->isSMTP();
            $mail->Host = 'smtp.yandex.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'testm4971@yandex.kz';
            $mail->Password = 'sufbsdjkfbkljsd';
            $mail->SMTPSecure = 'ssl';
            $mail->Port = 465;

            //Recipients
            $mail->setFrom('testm4971@yandex.kz', 'Mailer');
            $mail->addAddress($this->email, 'Joe User');
            $mail->addReplyTo('testm4971@yandex.kz', 'Information');
            $mail->addCC('cc@example.com');
            $mail->addBCC('bcc@example.com');

            //Content
            $mail->isHTML(true);
            $mail->Subject = 'Бургерная: Новый заказ';
            $mail->Body = 'Новый заказ от ' . date('Y-m-d H:i:s') . ' создан.' . '<br>' .
                "Имя: {$this->post['name']} <br>" .
                "Телефон: {$this->post['tel']} <br>" .
                "Улица: {$this->post['street']} <br>" .
                "Дом: {$this->post['house']} <br>" .
                "Корпус: {$this->post['housing']} <br>" .
                "Квартира: {$this->post['flat']} <br>" .
                "Этаж: {$this->post['floor']} <br>" .
                "Комментарий: {$this->post['comment']} <br>" .
                "Сдача или карта: {$this->post['cardOrSdacha']} <br>" .
                "Не перезванивать: {$this->callOrNot} <br>";

            $mail->send();

            return 'Письмо отправлено';
        } catch (Exception $e) {
            return 'Письмо не удалось отправить';
        }
    }
}