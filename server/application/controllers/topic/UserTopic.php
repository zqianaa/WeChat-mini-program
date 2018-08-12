


<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class UserTopic extends CI_Controller {
    public function index() {
      //$request = file_get_contents('php://input');
      //$arr = json_encode($request,true);
      //$id = $arr['userid'];
       // $nameKey = "kat";
      //DB::insert('user', ['userid' => $idKey,'username' =>              
        //   'basketball']);
       // $res = DB::select('user', ['*'], ['userid' => $idKey]);
        //$res = DB::select('user', ['*'], ['username' => $nameKey]);       
         //$res = DB::raw("SELECT * FROM user");
         //$nameKey = $_GET[userName];
         $nameKey = $_GET['userName'];
          //echo json_encode($nameKey);
         //$nameKey = '琴瑟在御莫不静好';
         $res = DB::raw("SELECT T.topicid, T.topicName, T.topictype, T.isclose, isCreator FROM user_topic U, topic T WHERE U.username = ? and U.topicID = T.topicID", array($nameKey));
         $result = $res->fetchAll();
         //print_r($result);
         echo json_encode($result);
        
    }
}


