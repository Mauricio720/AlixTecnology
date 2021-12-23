<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExternalClient extends Model
{
    use HasFactory;
    
    protected $connection= 'alix_mysql';
    protected $primaryKey="cd_cliente";
    protected $table='sd_cliente';
}
