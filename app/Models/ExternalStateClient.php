<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExternalStateClient extends Model
{
    use HasFactory;
    protected $connection= 'alix_mysql';
    protected $primaryKey="cd_cidade";
    protected $table='sd_cidade';

}
