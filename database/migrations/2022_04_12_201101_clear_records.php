<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;


class ClearRecords extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('checklists', function (Blueprint $table) {
            DB::table('checklists')->truncate();
            DB::table('checklist_json')->truncate();
            DB::table('checklist_options')->truncate();
            DB::table('default_checklists')->truncate();
            DB::table('default_checklist_json')->truncate();
            DB::table('default_checklist_options')->truncate();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('checklists', function (Blueprint $table) {
            //
        });
    }
}
