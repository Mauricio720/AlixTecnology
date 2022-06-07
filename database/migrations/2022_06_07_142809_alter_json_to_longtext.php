<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterJsonToLongtext extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('default_checklists', function ($table) {
            $table->longText('json')->nullable()->change();
        });

        Schema::table('default_checklist_json', function ($table) {
            $table->longText('json')->change();
        });

        Schema::table('checklist_json', function ($table) {
            $table->longText('json')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('longtext', function (Blueprint $table) {
            //
        });
    }
}
