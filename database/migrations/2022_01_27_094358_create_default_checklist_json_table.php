<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDefaultChecklistJsonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('default_checklist_json', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->text('names');
            $table->text('json');
            $table->integer('lastIdIncrement');
            $table->integer('lastIdIncrementOption');
            $table->integer('id_user');
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
        Schema::dropIfExists('default_checklist_json');
    }
}
