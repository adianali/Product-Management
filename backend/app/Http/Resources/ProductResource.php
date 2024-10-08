<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'product_name' => $this->product_name,
            'category' => $this->category,
            'price' => $this->price,
            'discount' => $this->discount,
            'created_at' => $this->created_at,
        ];
    }
}
