export function buildCategoryTree(data: any[]) {
  const map = new Map();

  // Khởi tạo mỗi object với key `_id`
  data.forEach((item) => {
    map.set(item._id, { ...item, children: [] });
  });

  const tree: any[] = [];

  data.forEach((item) => {
    if (item.parentId) {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children.push(map.get(item._id));
      }
    } else {
      tree.push(map.get(item._id));
    }
  });

  return tree;
}
