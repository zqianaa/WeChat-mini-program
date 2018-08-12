


<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class UploadMsg extends CI_Controller {
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
         $msgIDKey = $_GET['msgID'];
         $contentKey = $_GET['content'];
         $userIDKey = $_GET['userOpenID'];
         $isMeKey = $_GET['isMe'];
         $isPosKey = $_GET['isPos'];
         $oidKey = $_GET['opinionID'];
          //echo json_encode($nameKey);
         //$nameKey = '琴瑟在御莫不静好';
         DB::insert('message', ['msgid' => $msgIDKey, 'useropenid' => $userIDKey, 'content' => $contentKey, 'isme' => $isMeKey, 'ispos' => $isPosKey, 'opinionid' => $oidKey  ]);

    }
}


