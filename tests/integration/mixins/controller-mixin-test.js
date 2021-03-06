import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
import sinon from 'sinon';

import ControllerMixin from 'ember-css-modules/mixins/controller-mixin';
import { moduleFor, test } from 'ember-qunit';

moduleFor('Integration | Mixin | controller mixin', {
  integration: true,

  beforeEach() {
    this.owner = getOwner(this);
    this.owner.registerOptionsForType('styles', { instantiate: false });
  }
});

test('it exposes a deprecated styles property', function(assert) {
  let styles = {};

  this.owner.register('controller:thing', Ember.Controller.extend(ControllerMixin));
  this.owner.register('styles:thing', styles);

  let subject = this.owner.lookup('controller:thing');

  sinon.stub(Ember, 'deprecate');

  assert.equal(subject.get('styles'), styles);
  assert.ok(Ember.deprecate.calledWithMatch(/controller\.styles/, false, {
    id: 'ember-css-modules.styles-computed',
    until: '0.7.0'
  }));

  Ember.deprecate.restore();
});

test('it exposes a computed __styles__ property', function(assert) {
  let styles = {};

  this.owner.register('controller:thing', Ember.Controller.extend(ControllerMixin));
  this.owner.register('styles:thing', styles);

  let subject = this.owner.lookup('controller:thing');

  assert.equal(subject.get('__styles__'), styles);
});
