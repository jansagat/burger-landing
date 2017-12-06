<?php

namespace Burger;

require './vendor/autoload.php';

use Burger\MailController\MailController;

$obj = new  MailController();
$obj->setEmail('sagyt@bk.ru');
$result = $obj->sendEmail();

echo $result;