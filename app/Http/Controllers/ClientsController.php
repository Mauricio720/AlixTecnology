<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ClientsController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function index(){
        $data=[];
        $data['allClients']=Client::paginate(10);

        return view('dashboard.clients.allClients',$data);
    }

    public function addClientView(Request $request){
        $data=[];
        return view('dashboard.clients.addClient',$data);
    }

    public function addClient(Request $request){
        $data=$request->only(['name','cnpj','responsible_general_name','responsible_general_phone',
            'technical_manager_name','technical_manager_phone','financial_officer_name','financial_officer_phone',
            'contact_monitoring_name','contact_monitoring_phone','street','number','neighboorhood','state','cep'
        ]);

        $id=Auth::user()->id;
        $this->validatorClient($data,$id);
        
        if($this->verifyClient($data['cnpj'])==false){
            $client=new Client();
            $client->name=$data['name'];
            $client->cnpj=$data['cnpj'];
            $client->responsible_general_name=$data['responsible_general_name'];
            $client->responsible_general_phone=$data['responsible_general_phone'];
            $client->technical_manager_name=$data['technical_manager_name'];
            $client->technical_manager_phone=$data['technical_manager_phone'];
            $client->financial_officer_name=$data['financial_officer_name'];
            $client->financial_officer_phone=$data['financial_officer_phone'];
            $client->contact_monitoring_name=$data['contact_monitoring_name'];
            $client->contact_monitoring_phone=$data['contact_monitoring_phone'];
            $client->street=$data['street'];
            $client->number=$data['number'];
            $client->neighboorhood=$data['neighboorhood'];
            $client->state=$data['state'];
            $client->state=$data['cep'];
            $client->save();
        }else{
            return redirect()->route('addClientView')->withInput()->withErrors('Cnpj ja cadastrado!');
        }
       
        return redirect()->route('allClients');
    }

    public function editClientView($id){
        $data=[];
        $client=Client::where('id',$id)->first();
        
        if($client == null){
            return redirect()->route('allClients');
        }

        $data['client']=$client;

        return view('dashboard.clients.editClient',$data);
    }

    public function editClient(Request $request){
        $data=$request->only(['id','name','cnpj','responsible_general_name','responsible_general_phone',
            'technical_manager_name','technical_manager_phone','financial_officer_name','financial_officer_phone',
            'contact_monitoring_name','contact_monitoring_phone','street','number','neighboorhood','state','cep'
        ]);

        $id=Auth::user()->id;
        $this->validatorClient($data,$id);
        $client=Client::where('id',$data['id'])->first();
        
        if($client->cnpj != $data['cnpj']){
            if($this->verifyClient($data['cnpj'])==false){
                $client->name=$data['name'];
                $client->cnpj=$data['cnpj'];
                $client->responsible_general_name=$data['responsible_general_name'];
                $client->responsible_general_phone=$data['responsible_general_phone'];
                $client->technical_manager_name=$data['technical_manager_name'];
                $client->technical_manager_phone=$data['technical_manager_phone'];
                $client->financial_officer_name=$data['financial_officer_name'];
                $client->financial_officer_phone=$data['financial_officer_phone'];
                $client->contact_monitoring_name=$data['contact_monitoring_name'];
                $client->contact_monitoring_phone=$data['contact_monitoring_phone'];
                $client->street=$data['street'];
                $client->number=$data['number'];
                $client->neighboorhood=$data['neighboorhood'];
                $client->state=$data['state'];
                $client->state=$data['cep'];
                $client->save();
            }else{
                return redirect()->route('addClientView')->withInput()->withErrors('Cnpj ja cadastrado!');
            }
        }else{
            $client->name=$data['name'];
            $client->cnpj=$data['cnpj'];
            $client->responsible_general_name=$data['responsible_general_name'];
            $client->responsible_general_phone=$data['responsible_general_phone'];
            $client->technical_manager_name=$data['technical_manager_name'];
            $client->technical_manager_phone=$data['technical_manager_phone'];
            $client->financial_officer_name=$data['financial_officer_name'];
            $client->financial_officer_phone=$data['financial_officer_phone'];
            $client->contact_monitoring_name=$data['contact_monitoring_name'];
            $client->contact_monitoring_phone=$data['contact_monitoring_phone'];
            $client->street=$data['street'];
            $client->number=$data['number'];
            $client->neighboorhood=$data['neighboorhood'];
            $client->state=$data['state'];
            $client->state=$data['cep'];
            $client->save();
        }
        return redirect()->route('allClients');
    }

    public function deleteClient($id){
        if($id != ""){
            $client=Client::where('id',$id)->first();
            if($client != null){
                $client->delete();
            }
        }

        return redirect()->route('allClients');
    }

    
    private function verifyClient($cnpj){
        $client=Client::where('cnpj',$cnpj)->first();
        
        if($client != null){
            return true;
        }else{
            return false;
        }
    }

    private function validatorClient($data,$id){
        return Validator::make($data,[
            'name'=>['required','string','max:250'],
            'cnpj'=>['cnpj','required','string'],
            'responsible_general_name'=>['required','string','max:150'],
            'responsible_general_phone'=>['required','string','max:20','celular_com_ddd'],
            'technical_manager_name'=>['required','string','max:150'],
            'technical_manager_phone'=>['required','string','max:20','celular_com_ddd'],
            'financial_officer_name'=>['required','string','max:150'],
            'financial_officer_phone'=>['required','string','max:20','celular_com_ddd'],
            'contact_monitoring_name'=>['required','string','max:150'],
            'contact_monitoring_phone'=>['required','string','max:20','celular_com_ddd'],
            'street'=>['string','max:100','nullable'],
            'number'=>['string','max:10','nullable'],
            'neighboorhood'=>['string','max:100','nullable'],
            'state'=>['string','max:100','nullable'],
            'cep'=>['string','max:100','nullable'],
        ],[],[
            'name'=>'nome cliente',
            'responsible_general_name'=>'nome responsável geral',
            'responsible_general_phone'=>'telefone responsável geral',
            'technical_manager_name'=>'nome responsável técnico',
            'technical_manager_phone'=>'telefone responsável técnico',
            'financial_officer_name'=>'nome responsável financeiro',
            'financial_officer_phone'=>'telefone responsável técnico',
            'contact_monitoring_name'=>'nome responsável monitoramento',
            'contact_monitoring_phone'=>'telefone responsável monitoramento',
            'street'=>'rua',
            'number'=>'numero',
            'neighboorhood'=>'bairro',
            'state'=>'estado',
        ])->validate();
    }
}
