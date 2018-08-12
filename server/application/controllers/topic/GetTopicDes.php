
<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class GetTopicDes extends CI_Controller {
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
         $idKey = $_GET['topicID'];
          //echo json_encode($nameKey);
         //$nameKey = '琴瑟在御莫不静好';
         $res = DB::raw("SELECT topicdes FROM topic WHERE topicid = ?", array($idKey));
         $result = $res->fetchAll();
         //print_r($result);
         echo json_encode($result);
        
    }
}


