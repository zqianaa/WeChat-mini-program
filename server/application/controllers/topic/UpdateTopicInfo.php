


<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class UpdateTopicInfo extends CI_Controller {
    public function index() {
      //DB::insert('user', ['userid' => $idKey,'username' =>              
        //   'basketball']);
       // $res = DB::select('user', ['*'], ['userid' => $idKey]);
        //$res = DB::select('user', ['*'], ['username' => $nameKey]);       
         //$res = DB::raw("SELECT * FROM user");
         //$nameKey = $_GET[userName];
          //echo json_encode($nameKey);
         //$nameKey = '琴瑟在御莫不静好';
         $idKey = $_GET['topicID'];
         $nameKey = $_GET['topicName'];
         $desKey = $_GET['topicDes'];
         $typeKey = $_GET['topicType'];

         /*$idKey = 1528095106000;
         $nameKey = 'newname';
         $desKey = 'newdes';
         $typeKey = 1;*/
         DB::raw("UPDATE topic SET topicname = ?, topicdes = ?, topictype = ? WHERE topicid = ?", array($nameKey, $desKey, $typeKey, $idKey));
    }
}


