<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDuplicateToDefaultChecklistTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('default_checklists', function (Blueprint $table) {
            $table->boolean('duplicate');
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
            $table->dropColumn('duplicate');
        });
    }
}
