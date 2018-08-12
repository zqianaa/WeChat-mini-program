


<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class UpdateOpinionInfo extends CI_Controller {
    public function index() {
      //$request = file_get_contents('php://input');
      //$arr = json_encode($request,true);
      //$id = $arr['userid'];
         $oidKey = $_GET['opinionID'];
         $onameKey = $_GET['opinionName'];
         $odesKey = $_GET['opinionDes'];
         /*$idKey = 1528095106000;
         $nameKey = 'newname';
         $desKey = 'newdes';
         $typeKey = 1;*/
         DB::raw("UPDATE opinion SET opinionname = ?, opiniondes = ? WHERE opinionid = ?", array($onameKey, $odesKey, $oidKey));
       
    }
}


