


<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class DownloadMsg extends CI_Controller {
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
         $oidKey = $_GET['opinionID'];
          //echo json_encode($nameKey);
         //$nameKey = '琴瑟在御莫不静好';
         //如果topic没有close
         $res = DB::raw("SELECT msgid as id, type, content, user_info as user, isme as isMe, ispos as isPos FROM message, cSessionInfo WHERE opinionid = ? and message.useropenid = cSessionInfo.open_id", array($oidKey));
        // $res = DB::raw("SELECT user_info as user FROM cSessionInfo");
         $result = $res->fetchAll();
         echo json_encode($result);
         
         //print_r($result);
       // return $result;
        
    }
}


