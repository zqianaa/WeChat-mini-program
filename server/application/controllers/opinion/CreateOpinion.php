


<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class CreateOpinion extends CI_Controller {
    public function index() {
      //$request = file_get_contents('php://input');
      //$arr = json_encode($request,true);
      //$id = $arr['userid'];
        $oidKey = $_GET['opinionID'];
        $tidKey = $_GET['topicID'];
        $onameKey = $_GET['opinionName'];
        $odesKey = $_GET['opinionDes'];
        $creatorNameKey = $_GET['creatorName'];     
        DB::insert('opinion', ['opinionID' => $oidKey,'topicID' => $tidKey,'opinionname' => $onameKey,'opiniondes' => $odesKey,'creatorname' => $creatorNameKey]);
        //echo json_encode($res);
       
    }
}


