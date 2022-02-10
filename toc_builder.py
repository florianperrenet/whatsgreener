arr = [1, 1, 1, 2, 1, 2, 2, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]










arr_len = len(arr)

# d = []


# def build(index):
#     item = arr[index]
#     nextindex = index + 1

#     if nextindex == arr_len:
#         return
    
#     nextitem = arr[nextindex]

#     if nextitem > item:
#         d.append([item, []])
#     else:
#         d.append(item)
    
#     build(index + 1)
# build(0)

# arr = [1, 2, 2, 3, 3, 2, 1]
arr = [1, 1, 2, 2, 1]

# res = [
#     [1, [2, [2, [3, 3]], 2]],
#     1
# ]

res = [
    {"item": 1, "children": [
        {"item": 2, "children": []},
        {"item": 2, "children": [
            {"item": 3, "children": []},
            {"item": 3, "children": []}
        ]},
        {"item": 2, "children": []}
    ]},
    {"item": 1, "children": []}
]




def get_nested(arr):
    def helper(level=1):
        nonlocal idx

        res = []

        while idx < len(arr):
            num = arr[idx]

            if num == level:
                res.append({
                    "item": num,
                    "children": []
                })
                idx += 1
            elif num > level:
                tmp = helper(level=num)
                print('tmp', *tmp)
                res[-1]["children"].extend(tmp)
            else:
                return res

        return res

    idx = 0
    return helper(level=1)

if __name__ == "__main__":
    arr = [1, 2, 2, 3, 3, 2, 1]
    result = get_nested(arr)
    print(result)

    import json
    print(json.dumps(result))



# def build_children(arr):
#     """[1, 1, 2, 2, 1]"""
#     d = []
#     arr_len = len(arr)
#     for index, item in enumerate(arr):
#         nextindex = index + 1
#         if nextindex < arr_len:    
#             nextitem = arr[nextindex]

#             if nextitem > item:
#                 newarr = arr[index + 1:]
#                 print(newarr)
#                 print(build_children(newarr))
#                 d.append({
#                     "item": item,
#                     "children": build_children(newarr)
#                 })

#             if nextitem == item:
#                 d.append({
#                     "item": item,
#                     "children": []
#                 })
            
#             if nextitem < item:
#                 d.append({
#                     "item": item,
#                     "children": []
#                 })
#                 break
#         else:
#             d.append({
#                 "item": item,
#                 "children": []
#             })
        
#         # if nextitem < item:
#         #     d.append({
#         #         "item": item,
#         #         "children": []
#         #     })
        
#     return d

# print(build_children([1, 1, 2, 2, 1]))



# d = []

# arr_len = len(arr)
# for index, item in enumerate(arr):

#     nextindex = index + 1
#     if nextindex == arr_len:
#         break

#     nextitem = arr[index + 1]
#     haschild = nextitem > item

#     d.append({
#         "item": item,
#         "children": []
#     })

# print(d)


# def build(arr):
#     d = []

#     arr_len = len(arr)
#     for index, item in enumerate(arr):
#         if index + 1 < arr_len:
#             next_item = arr[index + 1]

#             if next_item > item:


#     return d

# print(build(arr))





# def build(index):
#     item = arr[index]
#     nextindex = index + 1

#     # end of arr
#     if nextindex == arr_len:
#         return

#     nextitem = arr[nextindex]

#     if nextitem == item:
#         d.append(item)
#         d.append(nextitem)

#     # elif nextitem > item:

#     build(index + 1)

# build(0)

# def get_children(index):
#     nextindex = index + 1

#     item = arr[index]
#     nextitem = arr[nextindex]

#     if nextitem > item:
#         return nextindex + 1, [nextitem]

#     return nextindex, []

# index = 0
# while index < arr_len:
#     item = arr[index]

#     index, children = get_children(index)

#     d.append([item, children])

#     print(d)









# print(d)
