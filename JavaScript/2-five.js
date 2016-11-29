'use strict';

function Tree(data) {
  this.count = 1;
  this.root = new Node(null, data);
  this.root.tree = this;
}

function Node(parent, data) {
  this.data = data;
  this.parent = parent;
  this.count = 0;
  if (parent) {
    this.tree = parent.tree;
    this.tree.count++;
    if (parent.count < 1) {
      parent.first = this;
    }
    if (parent.last) {
      parent.last.next = this;
      this.prev = parent.last;
    }
    parent.last = this;
    parent.count++;
  }
  this.prev = null;
  this.next = null;
  this.first = null;
  this.last = null;
}

Tree.prototype.forEach = function (callback) {
  goNext(callback, this.root);
}

function goNext(callback, node, stopNode) {
  callback(node);
  if (node.next !== null && node !== stopNode) {
    goNext(callback, node.next, stopNode === null ? node : stopNode);
  }
  if (node.first !== null) {
    goNext(callback, node.first);
  }
}

let tree = new Tree({ name: 'root' });
let n1 = new Node(tree.root, { name: 'n1' });
let n2 = new Node(tree.root, { name: 'n2' });
let n3 = new Node(tree.root, { name: 'n3' });

console.dir(tree, { depth: null });

tree.forEach(function (node) {
  console.log(node.data);
});
