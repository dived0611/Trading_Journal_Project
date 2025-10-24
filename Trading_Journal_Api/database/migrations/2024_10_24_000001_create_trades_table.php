<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('trades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('symbol');
            $table->string('session');
            $table->enum('type', ['Buy', 'Sell']);
            $table->decimal('entry', 10, 5);
            $table->decimal('exit', 10, 5)->nullable();
            $table->decimal('pnl', 10, 2);
            $table->enum('status', ['Open', 'Closed']);
            $table->decimal('position_size', 10, 2);
            $table->decimal('risk_percentage', 5, 2);
            $table->decimal('stop_loss', 10, 5);
            $table->decimal('take_profit', 10, 5);
            $table->text('entry_notes')->nullable();
            $table->text('management_notes')->nullable();
            $table->text('exit_notes')->nullable();
            $table->text('lessons_learned')->nullable();
            $table->timestamp('entry_time');
            $table->timestamp('exit_time')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('trades');
    }
};
