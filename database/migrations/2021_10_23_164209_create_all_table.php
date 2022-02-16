<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAllTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->string('name',250);
            $table->char('cnpj',18)->nullable();;
            $table->string('street',100)->nullable();
            $table->string('number',10)->nullable();
            $table->string('neighboorhood',100)->nullable();
            $table->string('state',100)->nullable();
            $table->string('cep',14)->nullable();
            $table->string('responsible_general_name',150)->nullable();;
            $table->string('responsible_general_phone',20)->nullable();;
            $table->string('technical_manager_name',150)->nullable();;
            $table->string('technical_manager_phone',20)->nullable();;
            $table->string('financial_officer_name',150)->nullable();;
            $table->string('financial_officer_phone',20)->nullable();;
            $table->string('contact_monitoring_name',150)->nullable();;
            $table->string('contact_monitoring_phone',20)->nullable();;
            $table->timestamps();
        });

        Schema::create('default_checklists', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->string('name',150);
            $table->integer('idDefaultChecklist')->nullable();
            $table->double('percentage');
            $table->double('points');
            $table->text('observation')->nullable();
            $table->tinyInteger('only_one_choose')->nullable();;
            $table->timestamps();
            $table->integer('id_type_checklist')->nullable();
        });

        
        Schema::create('default_checklist_options', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->string('name',150);
            $table->integer('idDefaultChecklist')->nullable();
            $table->double('percentage');
            $table->double('points');
            $table->tinyInteger('selected');
            $table->timestamps();
        });


        Schema::create('checklists', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->integer('id_default_checklist');
            $table->integer('id_checklist')->nullable();;
            $table->string('file_name',1000)->nullable();
            $table->double('points');
            $table->double('pointsObtained');
            $table->string('value',250)->nullable();;
            $table->integer('id_client');
            $table->integer('id_user');
            $table->text('observation');
            $table->timestamps();
        });

        Schema::create('checklist_options', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->integer('id_default_checklist_option');
            $table->integer('id_default_checklist');
            $table->integer('id_checklist');
            $table->double('points');
            $table->double('pointsObtained');
            $table->tinyInteger('selected');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
        Schema::dropIfExists('default_checklists');
        Schema::dropIfExists('default_subchecklists');
        Schema::dropIfExists('default_subchecklist_itens');
        Schema::dropIfExists('checklists');
        Schema::dropIfExists('subchecklist');
        Schema::dropIfExists('subchecklist_itens');
        Schema::dropIfExists('type_checklist');
    }
}
