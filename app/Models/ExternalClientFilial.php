<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExternalClientFilial extends Model
{
    use HasFactory;
    protected $connection= 'alix_mysql';
    protected $primaryKey="cd_filial";
    protected $table='sd_filial';
}
