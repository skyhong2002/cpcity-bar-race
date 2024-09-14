import json

# 載入數據
with open('data/cpcity.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# 收集每日前十名
all_top_names = set()  # 使用集合來避免重複

data = data['result']
# print(data['柯文哲'])

date_list = []
for i in data['柯文哲']:
    date_list.append(i)

for date in date_list:
    date_list = {}
    for person in data:
        if date in data[person]:
            date_list[person] = data[person][date]
    # sort by value
    date_list = {k: v for k, v in sorted(date_list.items(), key=lambda item: item[1], reverse=True)}
    # print top 10 names in date_list
    top_names = list(date_list.keys())[:10]
    print(date, top_names)
    # add top 10 names to all_top_names
    all_top_names.update(top_names)

# print all top names one by one
for name in all_top_names:
    print('\'', name, '\': \'#f00\',', sep='')

