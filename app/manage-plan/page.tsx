import SchematicComponent from "@/components/schematic/SchematicComponent";

function ManagePlan() {
  return (
    <div className="container mx-auto p-4 md:p-0">
        <h1 className="font-bold text-2xl mb-4 my-8">
            Manage Your Plan
        </h1>
        <p className="text-gray-600 mb-8">
            Manage your subscription and billing details here.
        </p>

        <SchematicComponent componentId="cmpn_8wdXsPxyfGP" />
    </div>
  )
}

export default ManagePlan;