<?php

namespace App\Http\Controllers;

use App\Domain\Example;
use Illuminate\Http\JsonResponse;

final class ExampleController extends Controller
{
    public function show(int $id): JsonResponse
    {
        $example = new Example($id, "example-{$id}");

        return response()->json(['data' => $example->toArray()]);
    }
}
