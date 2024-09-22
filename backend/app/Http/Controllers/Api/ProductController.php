<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::get();

        if($products->count() > 0){
            return ProductResource::collection($products);
        }else{
            return response()->json([
                'message' => 'No products found'
            ], 200);
        }
        
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
                    'product_name' => 'required|max:150',
                    'category' => 'required|max:100',
                    'price' => 'required|numeric',
                    'discount' => 'nullable|numeric',
                ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        $product = Product::create($validated);

        return response()->json([
            'message' => 'Product created successfully',
            'data' => new ProductResource($product)
        ], 200);
    }

    public function update(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(), [
            'product_name' => 'sometimes|required|max:150',
            'category' => 'sometimes|required|max:100',
            'price' => 'sometimes|required|numeric',
            'discount' => 'nullable|numeric',
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        $product->update($validated);

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => new ProductResource($product)
        ], 200);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        
        return response()->json([
            'message' => 'Product deleted successfully'
        ], 200);
    }

}
