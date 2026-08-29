<?php

namespace Tests\Unit;

use App\Domain\Example;
use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    public function test_it_exposes_the_expected_example_data(): void
    {
        $example = new Example(7, 'example-7');

        $this->assertSame([
            'id' => 7,
            'name' => 'example-7',
        ], $example->toArray());
    }
}
