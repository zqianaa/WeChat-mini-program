<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class CreateTopic extends CI_Controller {
    public function index() {
      //$request = file_get_contents('php://input');
      //$arr = json_encode($request,true);
      //$id = $arr['userid'];
        $topicNameKey = $_GET['topicName'];
        $desKey = $_GET['topicDes'];
        $typeKey = $_GET['topicType'];
        $idKey = $_GET['topicID'];
        $userNameKey = $_GET['userName'];
        $startDateKey = $_GET['startDate'];
       // $nameKey = "kat";
      //DB::insert('user', ['userid' => $idKey,'username' =>              
        //   'basketball']);
       // $res = DB::select('user', ['*'], ['userid' => $idKey]);
        //$res = DB::select('user', ['*'], ['username' => $nameKey]);   

        //更新 user table    
         DB::insert('topic', ['topicid' => $idKey, 'topicname' => $topicNameKey, 'topicdes' => $desKey, 'topictype' => $typeKey, 'startdate' => $startDateKey ]);
         //更新 user-topic table
         DB::insert('user_topic', ['username' => $userNameKey, 'topicid' => $idKey ]);
        //echo json_encode($res);
       
    }
}


