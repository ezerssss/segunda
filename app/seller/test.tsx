//  <View className="p-4">
//             <View className="">
//                 <Text aria-label="label" className="font-bold">
//                     What's this item?
//                 </Text>
//                 <View className="mt-2">
//                     <TextInput
//                         className="w-full rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900"
//                         placeholder="say something"
//                         multiline={true}
//                     ></TextInput>
//                 </View>
//             </View>
//             <View className="mt-2">
//                 <Text aria-label="label" className="font-bold">
//                     Item Price
//                 </Text>
//                 <View className="mt-2">
//                     <TextInput
//                         className="w-full rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900"
//                         placeholder="enter price"
//                         keyboardType="numeric"
//                     ></TextInput>
//                 </View>
//             </View>

//             <View className="mt-4">
//                 <TouchableOpacity
//                     className="self-baseline rounded border px-4 py-2"
//                     onPress={openImageLibrary}
//                 >
//                     <Text>Open Image Library</Text>
//                 </TouchableOpacity>

//                 <View className="mt-2 flex flex-row flex-wrap justify-center">
//                     {images
//                         ? images.map((image, index) => (
//                               <View key={index} className="mr-2 mt-2">
//                                   <Image
//                                       source={{ uri: image }}
//                                       className="h-20 w-20"
//                                   />
//                                   <TouchableOpacity
//                                       onPress={() => {
//                                           const updated = images.filter(
//                                               (_, image) => image !== index,
//                                           );
//                                           setImages(updated);
//                                       }}
//                                       className="absolute right-0 top-0 z-10 rounded-full bg-red-500 px-1"
//                                   >
//                                       <Text className="text-xs text-white">
//                                           ✕
//                                       </Text>
//                                   </TouchableOpacity>
//                               </View>
//                           ))
//                         : null}
//                 </View>
//                 {images && images.length > 5 ? (
//                     <View className="flex items-center justify-center">
//                         <View className="mt-4">
//                             <Button
//                                 title="Clear"
//                                 onPress={() => {
//                                     setImages([]);
//                                 }}
//                                 color="red"
//                             ></Button>
//                         </View>
//                     </View>
//                 ) : null}
//             </View>

//             <View className="mt-2">
//                 <TouchableOpacity
//                     className="self-baseline rounded border px-4 py-2"
//                     onPress={openCamera}
//                 >
//                     <Text>Open Camera</Text>
//                 </TouchableOpacity>
//                 <View className="mt-2 flex flex-row flex-wrap justify-center">
//                     {image ? (
//                         <View>
//                             <Image
//                                 source={{ uri: image }}
//                                 className="h-20 w-20"
//                             />
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     setImage(null);
//                                 }}
//                                 className="absolute right-0 top-0 z-10 rounded-full bg-red-500 px-1"
//                             >
//                                 <Text className="text-xs text-white">✕</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ) : null}
//                 </View>
//             </View>

//             <View className="mt-4">
//                 <Button
//                     title="Post Item"
//                     onPress={() => console.log("test")}
//                 ></Button>
//             </View>
//         </View>


// for UI 

// <View className="flex flex-col">
//     <View className="flex-row justify-between border-b border-black pb-2">
//         <View className="flex-row items-center">
//             <TouchableOpacity onPress={navigation.goBack}>
//                 <Text> back </Text>
//             </TouchableOpacity>
//             <Text className="ml-4 font-bold"> Create Post</Text>
//         </View>
//         <TouchableOpacity className="rounded-md bg-blue-500 px-4 py-2">
//             <Text className="font-bold text-white">Post</Text>
//         </TouchableOpacity>
//     </View>

//     <View className="mt-4 h-[200px] p-2">
//         <View className="flex-row items-center">
//             <View className="h-[45px] w-[45px] rounded-full bg-gray-300"></View>
//             <Text className="ml-2 font-bold"> User Name </Text>
//         </View>
//         <Controller
//             control={control}
//             name="caption"
//             render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                     onBlur={onBlur}
//                     onChangeText={onChange}
//                     value={value}
//                     placeholder="add a caption to your post"
//                 />
//             )}
//         />
//     </View>

//     <View>
//         <Button title="+ Add an item"></Button>
//     </View>
// </View>
