<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChecklistJsonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('checklist_json', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->string('names');
            $table->text('json');
            $table->text('grouping_json')->nullable();
            $table->integer('id_user');
            $table->integer('id_default_checklist');
            $table->integer('lastIdIncrement')->nullable();
            $table->integer('idClient')->nullable();
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
        Schema::dropIfExists('checklist_json');
    }
}
