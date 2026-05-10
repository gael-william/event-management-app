<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class EventController extends Controller
{
    public function index(): JsonResponse
    {
        $query = Event::withCount('registrations');

        if ($search = request('search')) {
            $query->where('title', 'like', '%'.trim($search).'%');
        }

        if ($date = request('date')) {
            $query->whereDate('starts_at', $date);
        }

        $events = $query->orderBy('starts_at')
            ->get()
            ->map(fn (Event $event) => $this->transform($event));

        return response()->json([
            'message' => 'Events retrieved successfully.',
            'data' => $events,
            'meta' => [
                'count' => $events->count(),
            ],
        ]);
    }

    public function store(StoreEventRequest $request): JsonResponse
    {
        $event = Event::create($request->validated());
        $event->loadCount('registrations');

        return response()->json([
            'message' => 'Event created successfully.',
            'data' => $this->transform($event)
        ], 201);
    }

    public function show(Event $event): JsonResponse
    {
        $event->loadCount('registrations');

        return response()->json([
            'message' => 'Event retrieved successfully.',
            'data' => $this->transform($event)
        ]);
    }

    public function update(UpdateEventRequest $request, Event $event): JsonResponse
    {
        $event->update($request->validated());
        $event->loadCount('registrations');

        return response()->json([
            'message' => 'Event updated successfully.',
            'data' => $this->transform($event)
        ]);
    }

    public function destroy(Event $event): Response
    {
        $event->delete();

        return response()->noContent();
    }

    private function transform(Event $event): array
    {
        return [
            'id' => $event->id,
            'title' => $event->title,
            'description' => $event->description,
            'location' => $event->location,
            'starts_at' => $event->starts_at?->toIso8601String(),
            'capacity' => $event->capacity,
            'registrations_count' => $event->registrations_count ?? 0,
            'remaining_capacity' => max(0, $event->capacity - ($event->registrations_count ?? 0)),
        ];
    }
}
