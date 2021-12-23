<?php

namespace App\Util;

use App\Models\Client;
use App\Models\ExternalClient;
use App\Models\ExternalClientFilial;
use App\Models\ExternalStateClient;

class CheckClientsRegister {

    private $externalClients=[];

    public function __construct()
    {
        $this->externalClients=ExternalClient::all();
    }
    
    public function verifyClientsExternal(){
        foreach ($this->externalClients as $key => $externalClient) {
            $externalClientId=$externalClient->cd_cliente;
            $client=$this->verifyClientById($externalClientId);

            if($client == null){
                $this->registerClient($externalClient);
            }
        }

        $this->getCodExternalClient();
    }

    private function verifyClientById($externalClientId){
        $client=Client::where('external_client_id',$externalClientId)->first();
        
        return $client;
    }

    private function getCodExternalClient(){
        $clients=Client::all();

        foreach ($clients as $key => $client) {
            if($client->external_client_id==0){
                $cd_cliente=$this->verifyExternalClientByCnpj($client->cnpj);
                if($cd_cliente !== null){
                    $client->external_client_id=$cd_cliente;
                    $client->save();
                }
            }
        }
    }

    private function verifyExternalClientByCnpj($cnpj){
        $cod_cliente=null;

        $externalClient=ExternalClientFilial::where('cnpj_filial',$cnpj)->first();
        if($externalClient !== null){
            $cod_cliente=$externalClient->cd_cliente;
        }
        
        return $cod_cliente;
    }

    private function registerClient(ExternalClient $externalClient){
        $externalClientFilial=ExternalClientFilial::where('cd_cliente',$externalClient->cd_cliente)->first();
        
        $client=new Client();
        $client->name=$externalClient->nm_cliente;
        $client->external_client_id=$externalClient->cd_cliente;

        if($externalClientFilial != null ){
            $client->cnpj=$externalClientFilial->cnpj_filial;
            $client->street=$externalClientFilial->en_filial;
            $client->neighboorhood=$externalClientFilial->ba_filial;
            $client->cep=$externalClientFilial->cep_filial;

            $externalCity=ExternalStateClient::where('cd_cidade',$externalClientFilial->cd_cidade)->first();

            if($externalCity!=null){
                $client->state=$externalCity->nm_cidade;
            }
        }
        $client->responsible_general_name=$externalClient->responsavel_legal;
        
        $client->save();
    }

}