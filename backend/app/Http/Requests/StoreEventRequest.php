<?php

namespace App\Http\Requests;

class StoreEventRequest extends ApiRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string', 'max:2000'],
            'location' => ['required', 'string', 'max:255'],
            'starts_at' => ['required', 'date', 'date_format:Y-m-d\TH:i:sP', 'after:now'],
            'capacity' => ['required', 'integer', 'min:1'],
        ];
    }
}
