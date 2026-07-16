<?php

namespace App\Http\Controllers\Movimentacoes;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MovimentacoesController extends Controller
{
    public function index() {

        return view("movimentacoes.index");

    }
}
