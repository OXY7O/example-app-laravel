<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleEndpointTest extends TestCase
{
    public function test_it_returns_the_requested_example(): void
    {
        $this->getJson('/api/examples/7')
            ->assertOk()
            ->assertExactJson([
                'data' => [
                    'id' => 7,
                    'name' => 'example-7',
                ],
            ]);
    }

    public function test_it_rejects_a_non_numeric_example_identifier(): void
    {
        $this->getJson('/api/examples/not-a-number')
            ->assertNotFound();
    }
}
