import FormBuilder from '@/components/form-builder';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        JSON Schema Form Builder
      </h1>
      <FormBuilder />
    </div>
  );
}
