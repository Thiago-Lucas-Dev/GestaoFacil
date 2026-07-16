<?php

namespace App\Http\Controllers\ContasPagar;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContasPagarController extends Controller
{
    public function index() {

        return view('contas_pagar.index');

    }

    public function create() {

        return view('contas_pagar.create');

    }
}
