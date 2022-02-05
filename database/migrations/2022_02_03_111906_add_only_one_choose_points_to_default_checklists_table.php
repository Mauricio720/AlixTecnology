<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOnlyOneChoosePointsToDefaultChecklistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('default_checklists', function (Blueprint $table) {
            $table->boolean('only_one_choose_points');
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
            $table->boolean('only_one_choose_points');
        });
    }
}
