<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLastIdIncrementToDefaultChecklistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('default_checklists', function (Blueprint $table) {
            $table->integer('last_id_increment')->nullable();
            $table->integer('last_id_increment_option')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('default_checklists', function (Blueprint $table) {
            $table->dropColumn('last_id_increment')->nullable();
            $table->dropColumn('last_id_increment_option')->nullable();
        });
    }
}
