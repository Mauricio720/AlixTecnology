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
            $table->char('cnpj',18);
            $table->string('street',100)->nullable();
            $table->string('number',10)->nullable();
            $table->string('neighboorhood',100)->nullable();
            $table->string('state',100)->nullable();
            $table->string('responsible_general_name',150);
            $table->string('responsible_general_phone',20);
            $table->string('technical_manager_name',150);
            $table->string('technical_manager_phone',20);
            $table->string('financial_officer_name',150);
            $table->string('financial_officer_phone',20);
            $table->string('contact_monitoring_name',150);
            $table->string('contact_monitoring_phone',20);
            $table->timestamps();
        });

        Schema::create('default_checklists', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->string('name',150);
            $table->timestamps();
            $table->integer('id_type_checklist');
        });

        Schema::create('default_subchecklists', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->integer('id_default_checklist');
            $table->string('name',150);
            $table->timestamps();
            $table->integer('type_subchecklist')
                ->comment(
                    '1 - UPLOAD;
                    2 -TEXT;
                    3- CHECKBOX;
                    4- TRUE OU FALSE;
                    5-NÙMERICO;
                    6-DATA'
            );
        });

        Schema::create('default_subchecklist_itens', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->integer('id_default_subchecklist');
            $table->string('name',150);
            $table->timestamps();
            $table->integer('type_subchecklist_item')
                ->comment(
                    '1 - UPLOAD;
                    2 -TEXT;
                    3- CHECKBOX;
                    4- TRUE OU FALSE;
                    5-NÙMERICO;
                    6-DATA'
            );
        });

        Schema::create('checklists', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->integer('id_default_checklist');
            $table->string('file_name',250)->nullable();
            $table->float('total_points');
            $table->integer('id_client');
            $table->integer('id_user');
            $table->text('observation');
            $table->timestamps();
        });

        Schema::create('subchecklist', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->integer('id_checklist');
            $table->string('file_name',250)->nullable();
            $table->float('total_points');
            $table->integer('value');
            $table->text('observation');
            $table->timestamps();
        });

        Schema::create('subchecklist_itens', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->integer('id_subchecklist');
            $table->integer('id_default_subchecklist_itens');
            $table->string('file_name',250)->nullable();
            $table->integer('points');
            $table->timestamps();
        });

        Schema::create('type_checklist', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->string('name',250);
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
