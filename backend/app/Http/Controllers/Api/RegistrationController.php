<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterParticipantRequest;
use App\Models\Event;
use App\Models\Registration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class RegistrationController extends Controller
{
    public function index(Event $event): JsonResponse
    {
        $registrations = $event->registrations()
            ->orderBy('created_at')
            ->get(['id', 'name', 'email', 'created_at']);

        return response()->json($registrations);
    }

    public function store(RegisterParticipantRequest $request, Event $event): JsonResponse
    {
        $event->loadCount('registrations');

        if ($event->registrations_count >= $event->capacity) {
            return response()->json([
                'error' => 'CAPACITY_REACHED',
                'message' => 'Cet evenement est complet.',
            ], 422);
        }

        if ($event->registrations()->where('email', $request->input('email'))->exists()) {
            return response()->json([
                'error' => 'DUPLICATE_EMAIL',
                'message' => 'Cette adresse email est deja enregistree pour cet evenement.',
            ], 409);
        }

        $registration = $event->registrations()->create($request->validated());

        return response()->json($registration, 201);
    }

    public function destroy(Registration $registration): Response
    {
        $registration->delete();

        return response()->noContent();
    }
}
